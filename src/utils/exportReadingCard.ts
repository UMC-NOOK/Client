import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

type Item =
  | { kind: 'phrase'; page: number | string | null; text: string }
  | { kind: 'quote'; text: string }
  | { kind: 'impression'; text: string };

type Assets = {
  bgImg: string;
  quoteIcon: string;
  impressionIcon: string;
  fullStar: string;
  emptyStar: string;
  bookImg: string;
};

type BookMeta = {
  title: string;
  author: string;
  dateText: string;
  rating?: number;
};

const PAGE_W = 290; // px (미리보기와 동일)
const PAGE_H = 516; // px
const BODY_H = 315.17; // px (본문 영역 높이)
const PADDING_LEFT = 41.3; // 레이아웃 패딩 (너 코드에 맞춤)
const PADDING_TOP = 37.73;
const PADDING_RIGHT = 23.71;

export async function exportReadingCardPages(opts: {
  items: Item[];
  book: BookMeta;
  assets: Assets;
  fileName?: string;
}) {
  const { items, book, assets, fileName } = opts;
  const root = document.createElement('div');
  root.style.cssText =
    'position:fixed;left:-99999px;top:-99999px;pointer-events:none;z-index:-1;';
  document.body.appendChild(root);

  // 폰트/이미지 준비
  await document.fonts?.ready?.catch(() => {});
  await ensureImage(assets.bgImg);
  await ensureImage(assets.bookImg);

  const zip = new JSZip();
  let pageNum = 1;
  let i = 0;

  while (i < items.length) {
    // 페이지 DOM 구성
    const { wrapper, body } = buildPageDOM({ book, assets });
    root.appendChild(wrapper);

    while (i < items.length) {
      const item = items[i];
      const node = buildItemNode(item, assets);
      body.appendChild(node);

      // 넘치면 다음 페이지로
      if (body.scrollHeight > body.clientHeight) {
        body.removeChild(node);

        // 만약 첫 아이템 자체가 너무 길면 텍스트 분할
        if (body.childElementCount === 0) {
          const chunks = splitTextToFit(item, body, assets);
          for (let c = 0; c < chunks.fitted.length; c++) {
            body.appendChild(buildItemNode(chunks.fitted[c], assets));
          }
          // 캡처
          await snapshotAndStore(wrapper, zip, pageNum);
          wrapper.remove();
          pageNum++;

          // 나머지 텍스트는 다음 페이지에서 계속
          if (chunks.remaining) {
            items.splice(i + 1, 0, chunks.remaining);
          }
          break;
        }

        // 캡처 & 다음 페이지 시작 (node는 다음 페이지에서 다시 시도)
        await snapshotAndStore(wrapper, zip, pageNum);
        wrapper.remove();
        pageNum++;
        break;
      } else {
        // 잘 들어갔으면 다음 아이템
        i++;
      }
    }

    // 마지막 페이지 flush
    if (i >= items.length) {
      await snapshotAndStore(wrapper, zip, pageNum);
      wrapper.remove();
    }
  }

  document.body.removeChild(root);
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const safeTitle = (fileName || book.title || 'reading-card').replace(
    /[\\/:*?"<>|]/g,
    '_',
  );
  saveAs(zipBlob, `${safeTitle}.zip`);
}

/* ---------------- helpers ---------------- */

function buildPageDOM({ book, assets }: { book: BookMeta; assets: Assets }) {
  const wrapper = document.createElement('div');
  wrapper.style.position = 'relative';
  wrapper.style.width = `${PAGE_W}px`;
  wrapper.style.height = `${PAGE_H}px`;
  wrapper.style.borderRadius = '12px';
  wrapper.style.overflow = 'hidden';
  wrapper.style.boxShadow = '0 8px 28px rgba(0,0,0,0.45)';
  wrapper.style.fontFamily =
    'NanumBaeEunHyeCe, Pretendard, system-ui, sans-serif';

  // 배경
  const bg = document.createElement('img');
  bg.src = assets.bgImg;
  bg.width = PAGE_W;
  bg.height = PAGE_H;
  bg.draggable = false;
  bg.style.display = 'block';
  wrapper.appendChild(bg);

  const overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.inset = '0';
  overlay.style.paddingLeft = `${PADDING_LEFT}px`;
  overlay.style.paddingTop = `${PADDING_TOP}px`;
  overlay.style.paddingRight = `${PADDING_RIGHT}px`;
  overlay.style.color = '#262626';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  wrapper.appendChild(overlay);

  // 헤더
  const header = document.createElement('div');
  header.style.flex = '0 0 auto';
  header.innerHTML = `
    <div style="display:flex;gap:28px;width:218px;align-items:flex-start">
      <div style="display:flex;gap:8px;justify-content:center;">
        <div style="width:39.48px;height:57.882px;border-radius:1.34px;background:rgba(0,0,0,0.1);margin-left:2.55px;overflow:hidden">
          <img src="${assets.bookImg}" style="width:39.48px;height:57.882px;object-fit:cover" crossorigin="anonymous"/>
        </div>
        <div style="display:flex;flex-direction:column;gap:5px;align-items:flex-start;justify-content:center">
          <div style="font-size:10.743px;width:90.106px;height:20px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(book.title)}</div>
          <div style="font-size:10.743px;width:90.106px;height:20px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(book.author)}</div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-top:25px">
        <div style="font-size:8.057px">${escapeHtml(book.dateText)}</div>
        <div style="display:flex;gap:2px;align-items:center;width:6px;height:6px">
          ${renderStars(book.rating ?? 0, assets)}
        </div>
      </div>
    </div>
  `;
  overlay.appendChild(header);

  // 본문
  const body = document.createElement('div');
  body.style.marginTop = '18.26px';
  body.style.flex = '1 1 auto';
  body.style.minHeight = '0';
  body.style.height = `${BODY_H}px`; // 고정 높이
  body.style.overflowY = 'hidden'; // fit 체크용으로 hidden, 캡처 전 스크롤 안 보이게
  overlay.appendChild(body);

  return { wrapper, body };
}

function buildItemNode(item: Item, assets: Assets): HTMLElement {
  if (item.kind === 'phrase') {
    const el = document.createElement('div');
    el.style.display = 'flex';
    el.style.alignItems = 'flex-start';
    el.style.gap = '7px';
    el.style.marginBottom = '7.01px';
    el.innerHTML = `
    <div style="display:flex;justify-content:flex-start;align-items:flex-start;width:100%;margin-bottom:7.01px;gap:14px">
      <div style="height:14px;display:flex;align-items:center;font-size:6.714px;color:#737373;">p.${escapeHtml(item.page ?? '-')}</div>
      <div style="white-space:pre-wrap;font-size:10.743px">${escapeHtml(item.text)}</div>
    </div>
    `;
    return el;
  }
  if (item.kind === 'quote') {
    const el = document.createElement('div');
    el.style.display = 'flex';
    el.style.alignItems = 'flex-start';
    el.style.gap = '4.21px';
    el.style.marginBottom = '7.01px';
    el.style.paddingLeft = '30px';
    el.innerHTML = `
    <div style="display:flex;align-items:flex-start;width:100%;color:10.743px;gap:4.21px;margin-bottom:7.01px;">
      <img src="${assets.quoteIcon}" style="width:10.55px;height:10.55px" />
      <div style="white-space:pre-wrap;font-size:10.743px">${escapeHtml(item.text)}</div>
    </div>
    `;
    return el;
  }
  // impression
  const el = document.createElement('div');
  el.style.display = 'flex';
  el.style.alignItems = 'flex-start';
  el.style.gap = '10px';
  el.style.marginBottom = '7.01px';
  el.innerHTML = `
  <div style="display: flex; align-items: flex-start; width: 100%; color: 10.743px; margin-bottom: 7.01px;gap:10px;">
    <img src="${assets.impressionIcon}" style="width:20px;height:23.48px" />
    <div style="white-space:pre-wrap;font-size:10.743px">${escapeHtml(item.text)}</div>
  </div>
  `;
  return el;
}

function renderStars(rating: number, assets: Assets) {
  return Array.from({ length: 5 })
    .map(
      (_, i) =>
        `<img src="${i < rating ? assets.fullStar : assets.emptyStar}" style="width:6px;height:6px" />`,
    )
    .join('');
}

async function snapshotAndStore(
  wrapper: HTMLElement,
  zip: JSZip,
  pageNum: number,
) {
  const canvas = await html2canvas(wrapper, {
    backgroundColor: null,
    scale: Math.max(2, window.devicePixelRatio || 1),
    useCORS: true,
  });
  const blob = await new Promise<Blob | null>((res) =>
    canvas.toBlob(res, 'image/png'),
  );
  if (blob) zip.file(`page-${String(pageNum).padStart(2, '0')}.png`, blob);
}

function ensureImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

function escapeHtml(s: any) {
  return String(s ?? '').replace(
    /[&<>"']/g,
    (m) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        m
      ]!,
  );
}

/** 단일 아이템이 페이지보다 클 때 텍스트를 잘라 여러 페이지로 분할 */
function splitTextToFit(item: Item, body: HTMLElement, assets: Assets) {
  // phrase/quote/impression 모두 text가 있다고 가정
  const text = (item as any).text as string;
  const prefix = text;
  let lo = 0,
    hi = text.length,
    fitLen = 0;

  const test = (len: number) => {
    const probe = buildItemNode(
      { ...(item as any), text: text.slice(0, len) },
      assets,
    );
    body.appendChild(probe);
    const ok = body.scrollHeight <= body.clientHeight;
    body.removeChild(probe);
    return ok;
  };

  // 이진 탐색으로 최대 길이 찾기
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (test(mid)) {
      fitLen = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  const fitted: Item[] = [{ ...(item as any), text: text.slice(0, fitLen) }];
  const remaining: Item | null =
    fitLen < text.length
      ? ({ ...(item as any), text: text.slice(fitLen) } as Item)
      : null;

  return { fitted, remaining };
}

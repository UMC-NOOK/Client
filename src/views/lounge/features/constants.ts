export type MallType = 'RECOMMENDATION' | 'BOOK' | 'FOREIGN' | 'EBOOK';

export const categoryToMallType = (selectedCategory: string): MallType => {
    switch (selectedCategory) {
        case '추천':
            return 'RECOMMENDATION';
        case '국내도서':
            return 'BOOK';
        case '외국도서':
            return 'FOREIGN';
        case 'eBook':
            return 'EBOOK';
        
        default:
            return 'RECOMMENDATION';
    }
};

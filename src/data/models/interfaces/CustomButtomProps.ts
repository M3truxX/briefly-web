export interface CustomButtomProps {
    theme?: 'light' | 'dark';
    text: string;
    activate?: boolean;
    loading?: boolean;
    onClick: () => void;
}
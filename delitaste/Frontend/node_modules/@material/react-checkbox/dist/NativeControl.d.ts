import React from 'react';
export interface NativeControlProps extends React.HTMLProps<HTMLInputElement> {
    checked: boolean;
    disabled: boolean;
    id?: string;
    rippleActivatorRef: React.RefObject<HTMLInputElement>;
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}
export declare class NativeControl extends React.Component<NativeControlProps, {}> {
    static defaultProps: Partial<NativeControlProps>;
    render(): JSX.Element;
}
export default NativeControl;

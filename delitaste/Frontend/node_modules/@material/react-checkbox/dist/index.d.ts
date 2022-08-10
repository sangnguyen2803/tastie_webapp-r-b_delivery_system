import React from 'react';
import { MDCCheckboxFoundation } from '@material/checkbox/foundation';
import { MDCCheckboxAdapter } from '@material/checkbox/adapter';
import { InjectedProps, RippledComponentProps } from '@material/react-ripple';
export interface CheckboxProps extends InjectedProps<HTMLDivElement, HTMLInputElement> {
    checked?: boolean;
    className?: string;
    disabled?: boolean;
    indeterminate?: boolean;
    name?: string;
    nativeControlId?: string;
    onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    initRipple: (surface: HTMLDivElement, activator?: HTMLInputElement) => void;
    children?: React.ReactNode;
    unbounded: boolean;
}
interface CheckboxState {
    checked?: boolean;
    indeterminate?: boolean;
    classList: Set<string>;
    'aria-checked': string;
    disabled: boolean;
}
export declare class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
    inputElement: React.RefObject<HTMLInputElement>;
    foundation: MDCCheckboxFoundation;
    constructor(props: CheckboxProps);
    static defaultProps: Partial<CheckboxProps>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: CheckboxProps): void;
    componentWillUnmount(): void;
    init: (el: HTMLDivElement) => void;
    handleChange: (checked: boolean, indeterminate: boolean) => void;
    readonly classes: string;
    updateState: (key: "checked" | "disabled" | "aria-checked" | "classList" | "indeterminate", value: string | boolean) => void;
    removeState: (key: "checked" | "disabled" | "aria-checked" | "classList" | "indeterminate") => void;
    readonly adapter: MDCCheckboxAdapter;
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    render(): JSX.Element;
}
declare const _default: React.ComponentType<Pick<CheckboxProps, "children" | "checked" | "name" | "onChange" | "indeterminate" | "nativeControlId"> & RippledComponentProps<HTMLDivElement>>;
export default _default;

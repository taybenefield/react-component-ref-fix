import * as React from 'react';
export interface RefProps {
    children: React.ReactElement;
    /**
     * Called when a child component will be mounted or updated.
     *
     * @param node - Referred node.
     */
    innerRef: React.Ref<HTMLElement>;
}
export interface RefState {
    kind: 'self' | 'forward' | 'find' | null;
}
export declare class Ref extends React.Component<RefProps, RefState> {
    prevNode?: Node | null;
    currentNode?: Node | null;
    private nodeRef;
    state: {
        kind: null;
    };
    static getDerivedStateFromProps(props: RefProps): RefState;
    handleForwardRefOverride: (node: HTMLElement) => void;
    handleSelfOverride: (node: HTMLElement) => void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: RefProps): void;
    componentWillUnmount(): void;
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | null;
}

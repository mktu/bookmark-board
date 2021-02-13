import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode,
    fallback: ReactNode | string
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            if(typeof this.props.fallback === 'string'){
                return <h1>{this.props.fallback}</h1>
            }
            return this.props.fallback
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 text-center">
          <div className="max-w-md space-y-6">
            <h1 className="text-4xl font-bold blue-gradient bg-clip-text text-transparent">문제가 발생했습니다</h1>
            <p className="text-white/60 font-light">
              죄송합니다. 예기치 않은 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
            </p>
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-xs font-mono text-left overflow-auto max-h-40 opacity-40">
              {this.state.error?.message}
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-primary rounded-full font-bold hover:bg-primary/80 transition-all"
            >
              새로고침
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

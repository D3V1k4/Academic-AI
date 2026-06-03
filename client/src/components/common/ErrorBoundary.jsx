import React from "react";
import { RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    if (this.props.onError) {
      this.props.onError(error, info);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="page-container">
          <div className="card-dark mx-auto max-w-2xl p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-coral/15 text-coral">
              <RefreshCw className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
            <p className="mt-3 text-muted">
              {this.state.error?.message || "An unexpected error occurred while rendering this page."}
            </p>
            <div className="mt-6">
              <Button onClick={this.handleRetry}>Retry</Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

import React from "react";

export interface ErrorComponentProps {
	reset?: () => void;
	children?: React.ReactNode;
}

export interface Props {
	component: React.ComponentType<ErrorComponentProps>;
	renderWhen?: (error: any, errorInfo: any) => boolean;
}

export default class ErrorBoundary extends React.Component<Props> {
	state = {
		error: false
	};

	componentDidCatch(_error: any, _errorInfo: any) {
		if (this.props.renderWhen) {
			this.setState({ error: this.props.renderWhen(_error, _errorInfo) });
		} else {
			this.setState({ error: true });
		}
	}

	resetHandler = () => {
		this.setState({ error: false });
	};

	render() {
		if (this.state.error === true) {
			const { component: Component } = this.props;
			return (
				<Component
					reset={this.resetHandler}
					children={this.props.children}
				/>
			);
		}

		return this.props.children;
	}
}

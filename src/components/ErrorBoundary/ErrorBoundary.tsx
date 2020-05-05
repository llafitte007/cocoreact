import React from "react";

export interface ErrorComponentProps {
	onReload: () => void;
}

export interface Props {
	component: React.ComponentType<ErrorComponentProps>;
}

export default class ErrorBoundary extends React.Component<Props> {
	state = {
		error: false
	};

	componentDidCatch(_error: any, _errorInfo: any) {
		this.setState({ error: true });
	}

	reloadHandler = () => {
		this.setState({ error: false });
	};

	render() {
		if (this.state.error === true) {
			const { component: Component } = this.props;
			return <Component onReload={this.reloadHandler} />;
		}

		return this.props.children;
	}
}

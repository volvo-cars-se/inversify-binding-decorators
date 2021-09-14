import getProvideDecorator from "./decorator/provide";
import getFluentProvideDecorator from "./decorator/fluent_provide";
import getProviderModuleBuilder from "./factory/module_factory";

function createProvideContext() {
    const metadataKey = Symbol("metadata_key");

    const provide = getProvideDecorator(metadataKey);
    const fluentProvide = getFluentProvideDecorator(metadataKey);
    const buildProviderModule = getProviderModuleBuilder(metadataKey);

    return { provide, fluentProvide, buildProviderModule };
}

export default createProvideContext;

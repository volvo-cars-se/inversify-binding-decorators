import getProvideDecorator from "./decorator/provide";
import getFluentProvideDecorator from "./decorator/fluent_provide";
import getProviderModuleBuilder from "./factory/module_factory";
import { interfaces as inversifyInterfaces } from "inversify";
import interfaces from "./interfaces/interfaces";

interface ProvideContext {
    provide: (serviceIdentifier: inversifyInterfaces.ServiceIdentifier<any>, force?: boolean) => any;
    fluentProvide: (serviceIdentifier: inversifyInterfaces.ServiceIdentifier<any>) => interfaces.ProvideInWhenOnSyntax<any>;
    buildProviderModule: () => inversifyInterfaces.ContainerModule;
}

function createProvideContext(): ProvideContext {
    const metadataKey = Symbol("metadata_key");

    const provide = getProvideDecorator(metadataKey);
    const fluentProvide = getFluentProvideDecorator(metadataKey);
    const buildProviderModule = getProviderModuleBuilder(metadataKey);

    return { provide, fluentProvide, buildProviderModule };
}

export default createProvideContext;

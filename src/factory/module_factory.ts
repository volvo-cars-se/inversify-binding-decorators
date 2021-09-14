import interfaces from "../interfaces/interfaces";
import { interfaces as inversifyInterfaces, ContainerModule } from "inversify";

function getProviderModuleBuilder(metadataKey: Symbol) {
    function buildProviderModule(): inversifyInterfaces.ContainerModule {
        return new ContainerModule((bind, unbind) => {
            let provideMetadata: interfaces.ProvideSyntax[] = Reflect.getMetadata(metadataKey, Reflect) || [];
            provideMetadata.map(metadata => resolve(metadata, bind));
        });
    }
    return buildProviderModule;
}

function resolve(metadata: interfaces.ProvideSyntax, bind: inversifyInterfaces.Bind) {
    return metadata.constraint(bind, metadata.implementationType);
}

export default getProviderModuleBuilder;

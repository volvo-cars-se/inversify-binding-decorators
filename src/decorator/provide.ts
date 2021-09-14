import { decorate, injectable, METADATA_KEY as inversify_METADATA_KEY } from "inversify";
import { interfaces as inversifyInterfaces } from "inversify";
import interfaces from "../interfaces/interfaces";

function getProvideDecorator(metadataKey: Symbol) {
  function provide(
    serviceIdentifier: inversifyInterfaces.ServiceIdentifier<any>,
    force?: boolean
  ) {

    return function (target: any) {

      const isAlreadyDecorated = Reflect.hasOwnMetadata(inversify_METADATA_KEY.PARAM_TYPES, target);
      const redecorateWithInject = force === true;

      if (redecorateWithInject === true && isAlreadyDecorated === false) {
        decorate(injectable(), target);
      } else if (redecorateWithInject === true && isAlreadyDecorated === true) {
        // Do nothing
      } else {
        try {
          decorate(injectable(), target);
        } catch (e) {
          throw new Error(
            "Cannot apply @provide decorator multiple times but is has been used " +
            `multiple times in ${target.name} ` +
            "Please use @provide(ID, true) if you are trying to declare multiple bindings!"
          );
        }
      }

      const currentMetadata: interfaces.ProvideSyntax = {
        constraint: (bind: inversifyInterfaces.Bind, bindTarget: any) => bind(serviceIdentifier).to(bindTarget),
        implementationType: target
      };

      const previousMetadata: interfaces.ProvideSyntax[] = Reflect.getMetadata(
        metadataKey,
        Reflect
      ) || [];

      const newMetadata = [currentMetadata, ...previousMetadata];

      Reflect.defineMetadata(
        metadataKey,
        newMetadata,
        Reflect
      );
      return target;

    };
  }

  return provide;
}

export default getProvideDecorator;

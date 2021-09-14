import ProvideInWhenOnSyntax from "../syntax/provide_in_when_on_syntax";
import ProvideWhenSyntax from "../syntax/provide_when_syntax";
import ProvideOnSyntax from "../syntax/provide_on_syntax";
import ProvideInSyntax from "../syntax/provide_in_syntax";
import ProvideDoneSyntax from "../syntax/provide_done_syntax";
import interfaces from "../interfaces/interfaces";
import { interfaces as inversifyInterfaces } from "inversify";

function getFluentProvideDecorator(metadataKey: Symbol) {
  function fluentProvide(serviceIdentifier: inversifyInterfaces.ServiceIdentifier<any>) {

    let bindingWhenOnSyntax = (bind: inversifyInterfaces.Bind, target: any) => bind<any>(serviceIdentifier).to(target);
    let bindingConstraintFunction = (bind: inversifyInterfaces.Bind, target: any) => (<any>bindingWhenOnSyntax(bind, target))._binding;
    let provideDoneSyntax = new ProvideDoneSyntax(bindingConstraintFunction, metadataKey);

    let provideInWhenOnSyntax: interfaces.ProvideInWhenOnSyntax<any> = new ProvideInWhenOnSyntax<any>(
      new ProvideInSyntax<any>(
        (bind: inversifyInterfaces.Bind, target: any) => bindingWhenOnSyntax(bind, target), provideDoneSyntax, metadataKey
      ),
      new ProvideWhenSyntax<any>(bindingWhenOnSyntax, provideDoneSyntax, metadataKey),
      new ProvideOnSyntax<any>(bindingWhenOnSyntax, provideDoneSyntax, metadataKey)
    );

    return provideInWhenOnSyntax;
  }

  return fluentProvide;
}

export default getFluentProvideDecorator;

import interfaces from "../interfaces/interfaces";
import ProvideOnSyntax from "./provide_on_syntax";
import ProvideDoneSyntax from "./provide_done_syntax";
import { interfaces as inversifyInterfaces } from "inversify";

class ProvideWhenSyntax<T> implements interfaces.ProvideWhenSyntax<T> {

    private _bindingWhenSyntax: (bind: inversifyInterfaces.Bind, target: any) => inversifyInterfaces.BindingWhenSyntax<T>;
    private _provideDoneSyntax: interfaces.ProvideDoneSyntax;
    private _metadataKey: Symbol;

    public constructor(
        bindingWhenSyntax: (bind: inversifyInterfaces.Bind, target: any) => inversifyInterfaces.BindingWhenSyntax<T>,
        provideDoneSyntax: interfaces.ProvideDoneSyntax,
        metadataKey: Symbol
    ) {
        this._bindingWhenSyntax = bindingWhenSyntax;
        this._provideDoneSyntax = provideDoneSyntax;
        this._metadataKey = metadataKey;
    }

    public when(constraint: (request: inversifyInterfaces.Request) => boolean): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) => {
            return this._bindingWhenSyntax(bind, target).when(constraint);
        };
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax, this._metadataKey);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax, this._metadataKey);
    }

    public whenTargetNamed(name: string): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingWhenSyntax(bind, target).whenTargetNamed(name);
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax, this._metadataKey);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax, this._metadataKey);
    }

    public whenTargetTagged(tag: string, value: any): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingWhenSyntax(bind, target).whenTargetTagged(tag, value);
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax, this._metadataKey);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax, this._metadataKey);
    }

    public whenInjectedInto(parent: (Function | string)): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingWhenSyntax(bind, target).whenInjectedInto(parent);
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax, this._metadataKey);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax, this._metadataKey);
    }

    public whenParentNamed(name: string): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingWhenSyntax(bind, target).whenParentNamed(name);
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax, this._metadataKey);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax, this._metadataKey);
    }

    public whenParentTagged(tag: string, value: any): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingWhenSyntax(bind, target).whenParentTagged(tag, value);
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax, this._metadataKey);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax, this._metadataKey);
    }

    public whenAnyAncestorIs(ancestor: (Function | string)): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingWhenSyntax(bind, target).whenAnyAncestorIs(ancestor);
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax, this._metadataKey);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax, this._metadataKey);
    }

    public whenNoAncestorIs(ancestor: (Function | string)): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingWhenSyntax(bind, target).whenNoAncestorIs(ancestor);
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax, this._metadataKey);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax, this._metadataKey);
    }

    public whenAnyAncestorNamed(name: string): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingWhenSyntax(bind, target).whenAnyAncestorNamed(name);
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax, this._metadataKey);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax, this._metadataKey);
    }

    public whenAnyAncestorTagged(tag: string, value: any): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingWhenSyntax(bind, target).whenAnyAncestorTagged(tag, value);
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax, this._metadataKey);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax, this._metadataKey);
    }

    public whenNoAncestorNamed(name: string): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingWhenSyntax(bind, target).whenNoAncestorNamed(name);
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax, this._metadataKey);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax, this._metadataKey);
    }

    public whenNoAncestorTagged(tag: string, value: any): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingWhenSyntax(bind, target).whenNoAncestorTagged(tag, value);
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax, this._metadataKey);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax, this._metadataKey);
    }

    public whenAnyAncestorMatches(constraint: (request: inversifyInterfaces.Request) => boolean): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingWhenSyntax(bind, target).whenAnyAncestorMatches(constraint);
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax, this._metadataKey);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax, this._metadataKey);
    }

    public whenNoAncestorMatches(constraint: (request: inversifyInterfaces.Request) => boolean): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingWhenSyntax(bind, target).whenNoAncestorMatches(constraint);
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax, this._metadataKey);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax, this._metadataKey);
    }

    public done(force?: boolean) {
        return this._provideDoneSyntax.done(force);
    }

}

export default ProvideWhenSyntax;

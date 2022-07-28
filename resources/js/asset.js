import isNil from 'lodash/isNil';
import kebabCase from 'lodash/kebabCase';

Nova.bootingCallbacks.unshift(app => {
    app.componentProxy = app.component;
    app.component = function (name, component) {
        if (component) component.name ??= name;
        return app.componentProxy(name, component);
    }

    let mixin = {
        mounted() {
            this.setThemingClasses();
        },
        updated() {
            const dependsOn = this.$props?.field?.dependsOn ?? {};
            if (Object.keys(dependsOn).length > 0) {
                this.setThemingClasses();
            }
        },
        methods: {
            setThemingClasses() {
                if (this.$el && this.$el.classList !== undefined && Nova?.appConfig?.theming) {
                    const themeConfig = Nova.appConfig.theming;
                    if (themeConfig.component === true) this.addThemingClass(this.$options?.name, themeConfig.prefix?.component ?? `component-`);
                    if (themeConfig.field === true) this.addThemingClass(this.$props?.field?.attribute, themeConfig.prefix?.field ?? `field-`);
                    if (themeConfig.resource === true) this.addThemingClass(this.$props?.resourceName, themeConfig.prefix?.resource ?? `resource-`);
                    if (themeConfig.flexGroup === true) this.addThemingClass(this.$props?.group?.name, themeConfig.prefix?.flexGroup ?? `flex-group-`);
                    if (themeConfig.panel === true) this.addThemingClass(this.$props?.panel?.name, themeConfig.prefix?.panel ?? `panel-`)
                }
            },
            addThemingClass(cssClass, prefix="") {
                if (!isNil(cssClass) && !this.$el.classList.contains(cssClass)) {
                    this.$el.classList.add(`${prefix}${kebabCase(cssClass)}`);
                }
            }
        }
    }
    app.mixin(mixin);
})

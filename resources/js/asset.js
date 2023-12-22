import isNil from 'lodash/isNil'
import kebabCase from 'lodash/kebabCase'

/**
 * @class Nova
 * @property Nova.bootingCallbacks
 * @method Nova.config
 *
 * @property theming.field
 * @property theming.resource
 * @property theming.flexGroup
 * @property theming.panel
 * @property theming.prefix
 * @property theming.prefix.component
 * @property theming.prefix.field
 * @property theming.prefix.resource
 * @property theming.prefix.flexGroup
 * @property theming.prefix.panel
 */
Nova.bootingCallbacks.unshift(app => {
  app.componentProxy = app.component
  app.component = function (name, component) {
    if (component) {
      component.name ??= name
    }

    return app.componentProxy(name, component)
  }

  let mixin = {
    mounted() {
      this.setThemingClasses()
    },
    updated() {
      this.setThemingClasses()
    },
    methods: {
      /**
       * @property this.$props.field
       */
      setThemingClasses() {
        const themeConfig = Nova.config('theming')
        if (!this.$el || this.$el.classList === undefined || !themeConfig || !this.$props) {
          return
        }

        if (themeConfig.component === true && this.$options && this.$options.name) {
          this.addThemingClass(this.$options.name, themeConfig.prefix?.component ?? 'component-')
        }
        if (themeConfig.field === true && this.$props.field && this.$props.field.attribute) {
          this.addThemingClass(this.$props.field.attribute, themeConfig.prefix?.field ?? 'field-')
          this.addThemingClass('field')
        }
        if (themeConfig.resource === true && this.$props.resourceName) {
          this.addThemingClass(this.$props.resourceName, themeConfig.prefix?.resource ?? 'resource-')
          this.addThemingClass('resource')
          console.log('set resources')
        }
        if (themeConfig.flexGroup === true && this.$props.group && this.$props.group.name) {
          this.addThemingClass(this.$props.group.name, themeConfig.prefix?.flexGroup ?? 'flex-group-')
          this.addThemingClass('flex-group')
        }
        if (themeConfig.panel === true && this.$props.panel && this.$props.panel.name) {
          this.addThemingClass(this.$props.panel.name, themeConfig.prefix?.panel ?? 'panel-')
          this.addThemingClass('panel')
        }
      },
      addThemingClass(cssClass, prefix = 'nova-') {
        if (!isNil(cssClass) && !this.$el.classList.contains(cssClass)) {
          this.$el.classList.add(`${prefix}${kebabCase(cssClass)}`)
        }
      }
    }
  }
  app.mixin(mixin)
})

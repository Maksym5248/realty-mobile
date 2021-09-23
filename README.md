
to avoid cyclic dependencies, only directories above in the list can be used


app
navigation
screens, modals
containers
store
services - components
hooks
utils
localization
styles
config
constants, types

error handling in store and screens

TODO:

ESLINT/TYPEXCRIPT
- + rewirite it with typescript
- + setup eslint rules and use ts lint rules
- + check rules for typescript
  
  
            MOBX
- +- types for mobx and definition, add support for parent
- update library
- normalize before apply data
- entities for mobx, create collection function
- +- improve flow model in mobx
- useStore with onReaction ??? works as useRedux 
- fix setting fields and types for them

            LOCALIZATON
- + refactoring localization, splite useLocalization on useTranslate and useCurrency

            REFACTORING
- + move the alert to modals dir
- + to think, do we need to split modal service on diff components
- + integrate events library
- + refactoring store and security store
- update react-navigation
- device util

            STYLES
- theme service and styles naming
- theme for navigation
- useColorScheme from react-native default - light
- check ui libraries for RN
  
            TESTS
- what is the best structure for tests ?
- move mocks to mock and use jest.mock ??
- finish test, where to write integration test ?
- jest vscode plugin

            DEBUG
- + fix tron usage
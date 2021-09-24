

High-level elements should not depend on high-level ones. To avoid cyclic dependencies, only directories above in the list can be used

app
navigation
screens, modals
containers
hooks
store
services - components
utils
localization
styles
config
constants, types

TODO: Подумати як це правильно розділяти !!!
Чи використовується prod варіант в react-native, для уникнення крешів в проді

Entities використовуються як DTO(Data transfer Object) - можуть мати методи роботи із ним, але не реалізовуються бізнес логіку

Stores - використовуються для бізнес логіки

TODO:

ESLINT/TYPEXCRIPT
- + rewirite it with typescript
- + setup eslint rules and use ts lint rules
- + check rules for typescript
  
  
            MOBX
- +- types for mobx and definition, add support for parent
- + update library
- +* normalize with normalazer and normaliza types of object before set it
- +* create collection function, create list
- + improve flow model in mobx
- useStore with onReaction ??? works as useRedux 
- +fix setting fields and types for them
- lazy loading
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
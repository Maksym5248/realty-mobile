
to avoid cyclic dependencies, only directories above in the list can be used


app
navigation
screens     - modals
containers
store
services
components
hooks
utils
localization
styles
config
constants - types

error handling in store and screens

TODO:
- move the alert to modals dir
- to think, do we need to split modal service on diff components
- is it better to contain all modules related to feature in one place or in different places ? examples: modal service, localization
- rewirite it with typescript
- setup eslint rules and use ts lint rules
- finish test, where to write integration test ?


// eslint config
// editor config
// pritter with eslint
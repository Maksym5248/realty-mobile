

## Description of files and variables
```
    ├── .env
    ├── assets                    
        ├── fonts
        ├── images
        ├── svg
    ├── test (settings needed for unit tests and library mocks)                   
    ├── src
        ├── api (Objects for communication with external api, such as rest api, websockets and bluetooth)                
        ├── components (Our own UI library, includes simple UI сomponents)
            ├── component
                ├── index
                ├── component.tsx
                ├── component.styles.ts
                ├── component.types.ts
                ├── component.test.ts
        ├── config (the only source of the application configuration, includes variables from the .env file and may also include other configuration files that may be part of the code)                  
        ├── constants                    
        ├── containers (Components that include business logic, communication with stores and are not simple UI components)                  
        ├── hooks                    
        ├── localization                    
        ├── modals                    
        ├── navigation (Responsible for the navigation structure and integrates all screens)                 
        ├── screens                    
        ├── services
        ├── stores (Responsible for data structure and business logic)                  
        ├── styles                    
        ├── types                    
        ├── utils                    
        ├── app.tsx
    ├── App.tsx                                     
``` 


## Dependency inversion

High-level modules should not import anything from low-level modules. It will avoid cyclic dependencies.

```
High-level

    1. constants, types
    2. config
    3. localization
    4. utils
    5. styles
    6. services, components
    7. store
    8. hooks
    9. containers
    10. screens, modals
    11. navigation
    12. app
    
Low-level
```
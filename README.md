# use-local-storage

[![Test Coverage](https://api.codeclimate.com/v1/badges/dcac97543ef0baebbd49/test_coverage)](https://codeclimate.com/github/motherbrainn/use-local-storage/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/dcac97543ef0baebbd49/maintainability)](https://codeclimate.com/github/motherbrainn/use-local-storage/maintainability)

A lightweight hook for client side apps that makes storing and modifying data in local storage as easy as setting state.

## Install
`npm install @motherbrainn/use-local-storage`

## How To Use
```
import { useLocalStorage } from "@motherbrainn/use-local-storage";

const [localStorageValue, localStorageSetterFunction] = useLocalStorage(key, value);
```


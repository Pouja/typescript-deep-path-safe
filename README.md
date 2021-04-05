# Type safe paths
Collections of generics to make deep nested string paths type safe.  

## ResolveType
It accepts 3 arguments:
1. The object type
2. The string path
3. The type to return if it fails to resolve

### Usage
For example you can augment the lodash `get`:
```typescript
import { get as _get } from 'lodash';

function get<ObjecType extends object, Path extends string, OrElse extends unknown>(obj:ObjecType, path: Path, orElse?: OrElse): ResolveType<ObjecType, Path, OrElse> {
  return _get(obj, path, orElse);
}

get(obj,'deeplvl1[1].deeplvl2.deeplvl3[88].deeplvl4.value');
```

Or for `react-final-form`:

```typescript
// file: form-value-hook.tsx
export function useFormValue<Path extends string>(field: Path): ResolveType<YourFormType, Path, unknown> {
  const fieldInput = useField(field, {
    subscription: {
      value: true
    }
  });
  return fieldInput.input.value;
}

// file: comp.tsx
export default function NestComponent() {
  const price = useFormValue('customers[3].contract.price');
  return (<div>{price}</div>);
}
```

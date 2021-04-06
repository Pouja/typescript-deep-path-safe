import { ResolveType } from '.';
import { get as _get } from 'lodash';
import {expectType} from 'tsd';

interface TestClass {
  normal: string;
  nested: {
    a: number;
    b: {
      c: boolean
    }
  };
  arr: number[];
  nestedArr: {
    sum: number;
    other: null;
  }[];
  deep: {
    arr: string[];
  },
  deeplvl1: {
    deeplvl2: {
      deeplvl3: {
        deeplvl4: {
          value: RegExp;
        }
      }[]
    }
  }[]
}

function get<ObjecType extends object, Path extends string, OrElse extends unknown>(obj:ObjecType, path: Path, orElse?: OrElse): ResolveType<ObjecType, Path, OrElse> {
  return _get(obj, path, orElse);
}

const obj = {} as TestClass;

expectType<number>(get(obj, 'nested.a', null));
expectType<string>(get(obj, 'normal', null));
expectType<number>(get(obj,'nested.a'));
expectType<boolean>(get(obj,'nested.b.c'));
expectType<number[]>(get(obj,'arr'));
expectType<number>(get(obj,'arr[13]'));
expectType<null>(get(obj,'nestedArr[3].other'));
expectType<string[]>(get(obj,'deep.deep'));
expectType<string>(get(obj,'deep.arr[333]'));
expectType<number>(get(obj,'deep.arr[333].length'));
expectType<boolean>(get(obj,'nested["b"]["c"]'));
expectType<never>(get(obj,''));
expectType<number>(get(obj,'', 3));
expectType<never>(get(obj,'nested.asdfasdf'));
expectType<RegExp>(get(obj,'deeplvl1[1].deeplvl2.deeplvl3[88].deeplvl4.value'));
expectType<never>(get(obj,'deeplvl1[1].deeplvl2.deeplvl1[88].deeplvl4.value'));
expectType<TestClass>(get(obj,'deeplvl1[1].deeplvl2.deeplvl1[88].deeplvl4.value', obj));
expectType<string>(get(obj,'nested["dd"]', ''));

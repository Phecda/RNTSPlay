import { PermissionsAndroid, Permission } from 'react-native';

export default async function checkPermission(types: Permission[]) {
  const checks = types.map(permission => PermissionsAndroid.check(permission));
  return Promise.all(checks).then(results => {
    let a = true;
    results.forEach(value => (a = a && value));
    if (a) {
      return Promise.resolve();
    } else {
      return PermissionsAndroid.requestMultiple(types).then(res => {
        let b = true;
        Object.keys(res).forEach(key => {
          b = b && res[key] === PermissionsAndroid.RESULTS.GRANTED;
        });
        if (b) {
          return Promise.resolve();
        } else {
          throw new Error('Permission Denied');
        }
      });
    }
  });
}

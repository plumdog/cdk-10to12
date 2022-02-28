# cdk-10to12

Hack all node10 Lambdas to use node12.

Note that this is definitely not safe in general. But you may well
find that your code runs fine in node12.

```typescript
import { cdk10to12 } from 'cdk-10to12';

...

const app = new cdk.App();

// Then attach things to app, like stacks, with constructs and Lambda functions

// Then force all uses of node10 Lambda runtimes to become node12, and
// hope that you don't get any bugs
cdk10to12(app);
```

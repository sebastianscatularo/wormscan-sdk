## Wormscan SDK

Software Development Kit to access wormscan API

## Getting Started

- [Installing](#installing)
- [Sample Usage](#sample-usage)
- [All in One](#all-in-one)

### Installing

```bash
yarn add github:xlabs/wormscan-sdk#lib
```

### Sample Usage

#### Initializing a sample proyect

```bash
mkdir -p sample-project/src
cd sample-project
yarn init -y
yarn add ts-node typescript github:xlabs/wormscan-sdk#lib
yarn tsc -init
```

#### Creating src/index.ts file

```typescript
cat <<\EOF>>src/index.ts
import { createClient } from '@xlabs-libs/wormscan-sdk';

const client = createClient();

console.log(client.isHealth());
console.log(client.isReady());
console.log(client.governor.getConfiguration());
console.log(client.guardianNetwork.getVAACount());
EOF
```

#### Running it

```bash
yarn ts-node src/index.ts
```

### All in one

```bash
export PROJECT_NAME=sample-project
mkdir -p ${PROJECT_NAME}/src
cd ${PROJECT_NAME}
yarn init -y
yarn add ts-node typescript github:xlabs/wormscan-sdk#lib
yarn tsc -init

cat <<\EOF>>src/index.ts
import { createClient } from '@xlabs-libs/wormscan-sdk';

const client = createClient('http://api.staging.wormscan.io/api/v1');

async function doCall() {
  console.log(await client.isHealth());
  console.log(await client.isReady());
  console.log(await client.governor.getConfiguration());
  console.log(await client.guardianNetwork.getVAACount());
}

doCall();
EOF

yarn ts-node src/index.ts

```

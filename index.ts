import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';

const fixConstructIfRequired = (construct: cdk.IConstruct): void => {
    if (construct instanceof lambda.CfnFunction) {
        construct.addPropertyOverride('Runtime', lambda.Runtime.NODEJS_12_X.toString());
    }
};

export const cdk10to12 = (construct: cdk.IConstruct): void => {
    fixConstructIfRequired(construct);
    for (const con of construct.node.children) {
        cdk10to12(con);
    }
};

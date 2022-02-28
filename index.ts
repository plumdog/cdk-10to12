import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';

const fixConstructIfRequired = (construct: cdk.IConstruct): void => {
    if (construct instanceof lambda.CfnFunction) {
        if (construct.runtime === 'nodejs10.x') {
            construct.addPropertyOverride('Runtime', lambda.Runtime.NODEJS_12_X.toString());
        }
    } else if (construct instanceof cdk.CfnResource && construct.cfnResourceType === 'AWS::Lambda::Function') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (construct.cfnProperties.Runtime === 'nodejs10.x') {
            construct.addPropertyOverride('Runtime', lambda.Runtime.NODEJS_12_X.toString());
        }
    }
};

export const cdk10to12 = (construct: cdk.IConstruct): void => {
    fixConstructIfRequired(construct);
    for (const con of construct.node.children) {
        cdk10to12(con);
    }
};

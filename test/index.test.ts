import { expect as cdkExpect, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import '@aws-cdk/assert/jest';
import { cdk10to12 } from '..';
import * as lambda from '@aws-cdk/aws-lambda';

test('handles empty stack', () => {
    const stack = new cdk.Stack();
    cdk10to12(stack);
});

const code = new lambda.InlineCode('export const main = () => {}');

test('updates old lambda', () => {
    const stack = new cdk.Stack();

    new lambda.Function(stack, 'MyFunction', {
        functionName: 'MyFunction',
        runtime: lambda.Runtime.NODEJS_10_X,
        code,
        handler: 'main',
    });

    cdkExpect(stack).to(
        haveResource('AWS::Lambda::Function', {
            FunctionName: 'MyFunction',
            Runtime: 'nodejs10.x',
        }),
    );

    cdk10to12(stack);

    cdkExpect(stack).to(
        haveResource('AWS::Lambda::Function', {
            FunctionName: 'MyFunction',
            Runtime: 'nodejs12.x',
        }),
    );
});

test('handles nested lambda', () => {
    const stack = new cdk.Stack();

    const myConstructA = new cdk.Construct(stack, 'A');
    const myConstructB = new cdk.Construct(myConstructA, 'B');

    new lambda.Function(myConstructB, 'MyFunction', {
        functionName: 'MyFunction',
        runtime: lambda.Runtime.NODEJS_10_X,
        code,
        handler: 'main',
    });

    cdkExpect(stack).to(
        haveResource('AWS::Lambda::Function', {
            FunctionName: 'MyFunction',
            Runtime: 'nodejs10.x',
        }),
    );

    cdk10to12(stack);

    cdkExpect(stack).to(
        haveResource('AWS::Lambda::Function', {
            FunctionName: 'MyFunction',
            Runtime: 'nodejs12.x',
        }),
    );
});

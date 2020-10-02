import { SelectFields } from '../select-fields';
import { Request } from '../base';
import { ContextBuilder } from '../context-builder';
import { Context } from '../context';
import { ContextRunner } from './context-runner';
export declare class ContextRunnerImpl implements ContextRunner {
    private readonly builderOrContext;
    private readonly selectFields;
    constructor(builderOrContext: ContextBuilder | Context, selectFields?: SelectFields);
    run(req: Request, options?: {
        dryRun?: boolean;
    }): Promise<Context>;
}

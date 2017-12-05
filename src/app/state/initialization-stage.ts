export class InitializationStage {
    stageStart: boolean;
    appConfigReceived: boolean;
    localeReceived: boolean;
    modelReceived: boolean; // TODO integration data
    paymentMethodsReceived: boolean;
    formsFlowInit: boolean;
    stageDone: boolean;
}

import {
    ChangeStepStatus,
    SetModel,
    ResetStage,
    SetFormsFlowAction,
    ResultAction
} from 'checkout/actions';
import { FormFlowItem } from 'checkout/form-flow';
import { Locale } from 'checkout/locale';
import { ModelState, CardFormState, ResultState } from 'checkout/state';
import { InitConfig } from 'checkout/config';
import { StepStatus } from 'checkout/lifecycle';

export interface ResultFormProps {
    locale: Locale;
    model: ModelState;
    initConfig: InitConfig;
    formsFlow: FormFlowItem[];
    active: FormFlowItem;
    cardForm: CardFormState;
    setFormFlow: (formFlow: FormFlowItem[]) => SetFormsFlowAction;
    resetStage: (stageName: string) => ResetStage;
    changeStepStatus: (stageName: string, stepName: string, value: StepStatus) => ChangeStepStatus;
    setModel: (model: ModelState) => SetModel;
    setResult: (resultState: ResultState) => ResultAction;
}

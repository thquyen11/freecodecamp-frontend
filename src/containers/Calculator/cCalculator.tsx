import * as React from "react";
import { connect } from "react-redux";
import { Button } from "../../components/Calculator/Button";
import { onInput } from "./aCalculator";
import "./cCalculator.scss";

interface StateProps {
  display: string;
  toCalculate: any[];
}

const mapStateToProps = (state: any): StateProps => {
  return {
    display: state.Calculator.display,
    toCalculate: state.Calculator.toCalculate,
  };
};

interface DispatchProp {
  onInput: typeof onInput;
}

const mapDispatchToProps = (dispatch: any): DispatchProp => {
  return {
    onInput: event => dispatch(onInput(event)),
  };
};

interface ICalculator extends StateProps, DispatchProp {}

class Calculator extends React.Component<ICalculator> {
  constructor(props: ICalculator) {
    super(props);
  }

  render() {

    return (
      <div id="page-wrapper-calculator">
        <div className="container col-md-6" id="calculator">
          <div className="container col-12">
            <div className="row justify-content-end" id="display-formula">
              {this.props.toCalculate}
            </div>
            <div className="row justify-content-end" id="display">
              {this.props.display}
            </div>
          </div>
          <div className="container col-12" id="keys">
            <div className="row">
              <Button value="C" id="clear" onClick={this.props.onInput} />
              <Button value="undo" id="undo" onClick={this.props.onInput} />
              <Button value="" id="" />
              <Button value="/" id="divide" onClick={this.props.onInput} />
            </div>
            <div className="row">
              <Button value="7" id="seven" onClick={this.props.onInput} />
              <Button value="8" id="eight" onClick={this.props.onInput} />
              <Button value="9" id="nine" onClick={this.props.onInput} />
              <Button value="*" id="multiply" onClick={this.props.onInput} />
            </div>
            <div className="row">
              <Button value="4" id="four" onClick={this.props.onInput} />
              <Button value="5" id="five" onClick={this.props.onInput} />
              <Button value="6" id="six" onClick={this.props.onInput} />
              <Button value="-" id="subtract" onClick={this.props.onInput} />
            </div>
            <div className="row">
              <Button value="1" id="one" onClick={this.props.onInput} />
              <Button value="2" id="two" onClick={this.props.onInput} />
              <Button value="3" id="three" onClick={this.props.onInput} />
              <Button value="+" id="add" onClick={this.props.onInput} />
            </div>
            <div className="row">
              <Button value="0" id="zero" onClick={this.props.onInput} />
              <Button
                value="."
                id="decimal"
                onClick={this.props.onInput}
              />
              <Button value="" id="" />
              <Button value="=" id="equals" onClick={this.props.onInput} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calculator);

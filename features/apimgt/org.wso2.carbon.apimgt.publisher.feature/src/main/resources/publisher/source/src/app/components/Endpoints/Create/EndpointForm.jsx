import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radio, { RadioGroup } from 'material-ui/Radio';
import TextField from 'material-ui/TextField';
import { FormControlLabel, FormLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Checkbox from 'material-ui/Checkbox';
import { withStyles } from 'material-ui/styles';
import CommonColors from 'material-ui/colors/common';
import Endpoint from '../../../data/Endpoint';

const styles = () => ({
    textField: {
        marginLeft: 20,
    },
    group: {
        display: 'flex',
    },
    legend: {
        marginBottom: 0,
        borderBottomStyle: 'none',
        marginTop: 20,
        fontSize: 12,
    },
    inputText: {
        marginTop: 20,
    },
    secured: {
        marginTop: 40,
    },
    disabled: {
        color: CommonColors.black,
    },
});

/**
 * Endpoint input/Display form component
 * @class EndpointForm
 * @extends {Component}
 */
class EndpointForm extends Component {
    /**
     * Creates an instance of EndpointForm.
     * @param {any} props @inheritDoc
     * @memberof EndpointForm
     */
    constructor(props) {
        super(props);
        this.state = {};
    }

    /**
     * @inheritDoc
     * @returns {React.Component} component
     * @memberof EndpointForm
     */
    render() {
        const { classes, endpoint } = this.props;
        let { handleInputs } = this.props;
        const isReadOnly = !handleInputs; // Showing the endpoint details
        handleInputs = handleInputs || null;
        return (
            <div>
                <form className={classes.container} noValidate autoComplete='off'>
                    <TextField
                        label='Endpoint Name'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        helperText='Enter a name to identify the endpoint. You will be able to pick this endpoint
                                        when creating/editing APIs '
                        fullWidth
                        name='endpointName'
                        onChange={handleInputs}
                        placeholder='Endpoint Name'
                        autoFocus
                        defaultValue={endpoint.name}
                        disabled={isReadOnly}
                        InputProps={{ classes: { disabled: classes.disabled } }}
                    />
                    <FormLabel component='legend' className={classes.legend}>
                        Endpoint Type
                    </FormLabel>
                    <RadioGroup
                        row
                        aria-label='type'
                        className={classes.group}
                        value={endpoint.type}
                        disabled={isReadOnly}
                        name='endpointType'
                        onChange={handleInputs}
                    >
                        <FormControlLabel value='http' control={<Radio color='primary' />} label='HTTP' />
                        <FormControlLabel value='https' control={<Radio color='primary' />} label='HTTPS' />
                    </RadioGroup>
                    <TextField
                        className={classes.inputText}
                        label='Max TPS'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        helperText='Max Transactions per second'
                        fullWidth
                        name='endpointMaxTPS'
                        defaultValue={endpoint.maxTps}
                        disabled={isReadOnly}
                        onChange={handleInputs}
                        placeholder='100'
                        InputProps={{ classes: { disabled: classes.disabled } }}
                    />
                    <TextField
                        className={classes.inputText}
                        name='endpointServiceUrl'
                        label='Service URL'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        helperText='Provide Service URL'
                        onChange={handleInputs}
                        placeholder='https://forecast-v3.weather.gov'
                        fullWidth
                        defaultValue={endpoint.endpointConfig.serviceUrl}
                        disabled={isReadOnly}
                        InputProps={{ classes: { disabled: classes.disabled } }}
                    />
                    <FormControlLabel
                        className={classes.inputText}
                        control={
                            isReadOnly ? (
                                <Checkbox checked={endpoint.endpointSecurity.enabled} />
                            ) : (
                                <Switch
                                    name='endpointSecurity'
                                    checked={endpoint.endpointSecurity.enabled}
                                    onChange={handleInputs}
                                    value='secured'
                                    color='primary'
                                />
                            )
                        }
                        label='Secured'
                    />
                    {endpoint.endpointSecurity.enabled && (
                        <div className={classes.secured}>
                            Type
                            <RadioGroup
                                row
                                name='endpointSecurityType'
                                value={endpoint.endpointSecurity.type}
                                disabled={isReadOnly}
                                onChange={handleInputs}
                            >
                                <FormControlLabel value='basic' control={<Radio />} label='Basic' />
                                <FormControlLabel value='digest' control={<Radio />} label='Digest' />
                            </RadioGroup>
                            <TextField
                                className={classes.inputText}
                                label='Username'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                helperText='Enter the Username'
                                fullWidth
                                margin='normal'
                                name='endpointSecurityUsername'
                                onChange={handleInputs}
                                placeholder='Username'
                                defaultValue={endpoint.endpointSecurity.username}
                                disabled={isReadOnly}
                                InputProps={{ classes: { disabled: classes.disabled } }}
                            />
                            <TextField
                                className={classes.inputText}
                                label='Password'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                helperText='Enter the Password'
                                fullWidth
                                name='endpointSecurityPassword'
                                onChange={handleInputs}
                                placeholder='Password'
                                defaultValue={endpoint.endpointSecurity.password}
                                disabled={isReadOnly}
                                InputProps={{ classes: { disabled: classes.disabled } }}
                            />
                        </div>
                    )}
                </form>
            </div>
        );
    }
}

EndpointForm.defaultProps = {
    handleInputs: false,
};
EndpointForm.propTypes = {
    classes: PropTypes.shape({}).isRequired,
    handleInputs: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    endpoint: PropTypes.instanceOf(Endpoint).isRequired,
};

export default withStyles(styles)(EndpointForm);

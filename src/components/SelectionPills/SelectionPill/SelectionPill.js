import React from 'react'
import Radium from 'radium'
import PropTypes from 'prop-types'
import { themePropTypes } from '../../../styles/themer/utils'
import withTheme from '../../../styles/themer/withTheme'
import { getStyles } from './styles'

const NoOp = () => {} // eslint-disable-line no-empty-function
class SelectionPill extends React.PureComponent {
  static propTypes = {
    /** Required unique identifier for the pill */
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

    /** Any additional props to add to the list element (e.g. data attributes). */
    listElementAttributes: PropTypes.object,

    /** Any additional props to add to the checkbox element (e.g. data attributes). */
    elementAttributes: PropTypes.object,

    /** Flag determining if component selected state is controlled by parent through props or internal state */
    controlled: PropTypes.bool,

    /** Determines wether or not selected styles are applied and start is a selected state */
    isSelected: PropTypes.bool,

    /** Determines Whether or not the pill is disabled. */
    isDisabled: PropTypes.bool,

    /** Callback function called after pill click
     * @param {SyntheticEvent} event The react `SyntheticEvent`
     * @param {props} object All the props passed to the component
     */
    onClick: PropTypes.func,

    /** Callback function called after pill gained focus
     * @param {SyntheticEvent} event The react `SyntheticEvent`
     * @param {props} object All the props passed to the component
     */
    onFocus: PropTypes.func,

    /** Callback function called after pill has lost focus
     * @param {SyntheticEvent} event The react `SyntheticEvent`
     * @param {props} object All the props passed to the component
     */
    onBlur: PropTypes.func,

    /** Snacks theme attributes provided by Themer */
    snacksTheme: themePropTypes,

    /** Text to appear inside pill */
    text: PropTypes.string,

    /** Optional style overrides for button and its states */
    style: PropTypes.shape({
      button: PropTypes.object,
      disabledStyle: PropTypes.object,
      selectedStyle: PropTypes.object,
      focusedStyle: PropTypes.object,
    }),

    /** Aria overrides for accessibility (i.e. use if label is not descriptive enough for screen readers) */
    aria: PropTypes.shape({
      label: PropTypes.string,
    }),
  }

  static defaultProps = {
    elementAttributes: {},
    isSelected: false,
    onClick: NoOp,
    onFocus: NoOp,
    onBlur: NoOp,
    style: {},
    aria: {},
  }

  state = {
    isSelected: this.props.isSelected,
    isFocused: false,
  }

  handleChange = event => {
    const { onClick } = this.props
    const { isSelected } = this.state

    this.setState({ isSelected: !isSelected })
    onClick(event, { ...this.props, isSelected: !isSelected })
  }

  toggleFocus = () => {
    const { isFocused } = this.state
    this.setState({ isFocused: !isFocused })
  }

  handleFocus = event => {
    const { onFocus } = this.props
    const { isFocused } = this.state

    this.toggleFocus()
    onFocus(event, { ...this.props, isFocused: !isFocused })
  }

  handleBlur = event => {
    const { onBlur } = this.props
    const { isFocused } = this.state

    this.toggleFocus()
    onBlur(event, { ...this.props, isFocused: !isFocused })
  }

  renderInputBtn() {
    const { aria, isDisabled, id } = this.props
    const { isSelected } = this.state

    const componentStyles = getStyles({})

    return (
      <div style={componentStyles.checkBoxOverrideStyle}>
        <input
          id={id}
          type="checkbox"
          onChange={this.handleChange}
          checked={isSelected}
          disabled={isDisabled}
          aria-label={aria.label}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
        />
      </div>
    )
  }

  render() {
    const { id, snacksTheme, text, style, isDisabled, controlled } = this.props
    const { isFocused } = this.state
    const { primaryForeground } = snacksTheme.colors
    const selected = (controlled && this.props.isSelected) || this.state.isSelected
    const componentStyles = getStyles({
      isSelected: selected,
      isFocused,
      isDisabled,
      primaryForeground,
      externalStyles: style,
    })

    return (
      <li style={componentStyles.listElement} {...this.props.listElementAttributes}>
        {this.renderInputBtn()}
        <label htmlFor={id} style={componentStyles.labelButton}>
          {text}
        </label>
      </li>
    )
  }
}

export default withTheme(Radium(SelectionPill))
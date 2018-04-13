/**
 * Created by leesx on 2017/3/12.
 */
import React, {Component, PropTypes} from 'react'
const NoMatch = ({location, match}) => {
	return (
		<div className="no-match-page">
			<h1>404找不到</h1>
			<p>网页迷路了......<code>{location.pathname}</code>
			</p>
		</div>
	)
}
export default NoMatch

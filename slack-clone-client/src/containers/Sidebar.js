import React from 'react'
import findIndex from 'lodash/findIndex'
import decode from 'jwt-decode';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag';
import Channels from '../components/Channels'
import Teams from '../components/Teams'

const Sidebar = ({data: {loading, allTeams}, currentTeamId }) =>{
  if (loading) {
    return null
  }

  const teamIdx = currentTeamId ? findIndex(allTeams, ['id', parseInt(currentTeamId )]) : 0
  const team = allTeams[teamIdx]
  let username = ''
  try {
    const token = localStorage.getItem('token')
    const { user } = decode(token)
    username = user.username
  } catch (err) {}
  return [
    <Teams
      key='teams-sidebar'
      teams={allTeams.map(t => ({
        id: t.id,
        letter: t.name.charAt(0).toUpperCase(),
      }))}
    />,
    <Channels
      key='channels-sidebar'
      teamName={team.name}
      userName={username}
      channels={team.channels}
      users={[{id: 1, name: 'slackbot'}, {id: 2, name: 'user2'}]}
    />,
  ]
};

const allTeamsQuery = gql`
  {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`

export default graphql(allTeamsQuery)(Sidebar)
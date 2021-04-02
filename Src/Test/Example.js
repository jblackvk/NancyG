import { getTodos, addTodos } from "./actions/todo.actions";
import { login } from "./actions/auth.actions";
import { getNancyBookPublications } from "./actions/publication.actions";
import {
  getMyCommunities,
  getAllCommunities,
  getCreatedCommunities,
  PostCommunity,
} from "./actions/community.actions";

import { getMyInfo } from "./actions/user.action";

import Actions from "./actions/index";

import React from "react";

import { connect } from "react-redux";
import {
  getMyFlowlowersList,
  getSubscriptionsList,
} from "./actions/user.action";

class AppC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      created_comm: null,
    };
  }

  submit = (event) => {
    event.preventDefault();
    this.props.testPostTodo();
  };

  onSuccess = (data) => {
    this.setState({ loading: !this.state.loading });
    console.log(data);
  };

  onFailled = (data) => {
    this.setState({ loading: !this.state.loading });
  };

  createCommunity = () => {
    const nom = document.getElementById("nom").value;
    const description = document.getElementById("description").value;

    this.props.addCommunity(
      { nom: nom, description: description, typeCommunaute: "public" },
      (data) => this.setState({ created_comm: data }),
      (error) => {
        console.log(error);
      },
      (data, error) => {
        if (data) {
          return "created ok" + data.name;
        } else {
          return "creation failled";
        }
      }
    );
  };

  notifMessage = (data, error) => {
    if (data) {
      return;
    }
    if (error) {
      return "Erreur lors du chargement des communautés";
    }
  };
  onGetAllCommunity = () => {
    this.setState({ loading: !this.state.loading });

    this.props.GetAllCommunities(
      {},
      this.onSuccess,
      this.onFailled,
      this.notifMessage
    );
  };

  onGetMyInfo = () => {
    this.props.GetMyInfo({}, this.onSuccess, this.onFailled, this.notifMessage);
  };

  render() {
    console.log(this.state.created_comm);
    return (
      <div>
        {this.props.user ? (
          <h1>bonjour : {this.props.user.mail}</h1>
        ) : (
          <h1>bonjour : Anonyme</h1>
        )}

        <div>
          <label for="nom">Nom</label>
          <input id="nom"></input>
          <label for="description">description</label>
          <input id="description"></input>

          <button
            onClick={() => {
              this.createCommunity();
            }}
          >
            Creer
          </button>
        </div>

        <div>
          {this.state.created_comm && (
            <div>
              <h1>{this.state.created_comm.name}</h1>
              <h1>{this.state.created_comm.description}</h1>
              <h1>{this.state.created_comm.superAdmin}</h1>
            </div>
          )}
        </div>
        <button onClick={this.submit}>Teste moi mince</button>
        <button onClick={this.props.login}>Login</button>
        <button onClick={this.props.getPublications}>Publications</button>
        <button onClick={this.props.getMyCommunities}>Mes comm</button>
        <button onClick={this.onGetAllCommunity}>Tout Comm</button>
        <button onClick={this.props.getCreatedCommunities}>Comm cree</button>
        <button onClick={this.props.getMyFolowers}>Mes folowers</button>
        <button onClick={this.props.getMysubscritions}>Mes abonements</button>
        <button onClick={this.onGetMyInfo}>Mes infos</button>

        <h1>notifications</h1>
        <ul>
          {this.props.notifications.map((elt) => {
            return (
              <li key={elt.id}>
                {elt.message}--{elt.id}
              </li>
            );
          })}
        </ul>

        <h1>MEs communautés</h1>

        {this.state.loading && <span>loading</span>}

        <ul>
          {this.props.my_communities.map((elt) => {
            return (
              <li key={elt.id}>
                {elt.name}--{elt.label}
              </li>
            );
          })}
        </ul>

        <h1>communautés cree</h1>
        {this.state.loading && <span>loading</span>}
        <ul>
          {this.props.created_communities.map((elt) => {
            return (
              <li key={elt.id}>
                {elt.name}--{elt.label}
              </li>
            );
          })}
        </ul>

        <h1> tout les communautés</h1>
        {this.state.loading && <span>loading</span>}

        <ul>
          {this.props.all_communities.map((elt) => {
            return (
              <li key={elt.id}>
                {elt.name}--{elt.label}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notificationReducer.notifications,
    my_communities: state.communityReducer.my_communities,
    created_communities: state.communityReducer.created_communities,
    all_communities: state.communityReducer.all_communities,
    user: state.authReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    testGetTodo: () =>
      dispatch(
        getTodos(
          {},
          {
            notifMessage: (data, error) => {
              return "Get reussit ok ?";
            },
            onSuccess: (data) => {
              console.log("SUper");
            },
          }
        )
      ),

    getMyFolowers: () => {
      dispatch(getMyFlowlowersList());
    },

    getMysubscritions: () => {
      dispatch(getSubscriptionsList());
    },

    getMyCommunities: () => {
      return dispatch(
        getMyCommunities(
          {},
          {
            notifMessage: (data, error) => {
              if (data) {
                return "GET MY NOTIF OK";
              } else {
                return "GET error";
              }
            },
          }
        )
      );
    },
    addCommunity: (
      data,
      onSuccess = (data) => {},
      onFailled = (data) => {},
      notifMessage = (data, error) => {}
    ) => {
      return dispatch(
        PostCommunity(
          { community: data },
          {
            onSuccess,
            onFailled,
            notifMessage,
          }
        )
      );
    },
    GetAllCommunities: (
      args = {},
      onSuccess = (data) => {},
      onFailled = (data) => {},
      notifMessage = (data, error) => {}
    ) => {
      return dispatch(
        getAllCommunities(args, {
          onSuccess,
          onFailled,
          notifMessage,
        })
      );
    },
    GetMyInfo: (
      args = {},
      onSuccess = (data) => {},
      onFailled = (data) => {},
      notifMessage = (data, error) => {}
    ) => {
      return dispatch(
        getMyInfo(args, {
          onSuccess,
          onFailled,
          notifMessage,
        })
      );
    },
    getCreatedCommunities: () => {
      return dispatch(
        getCreatedCommunities(
          {},
          {
            notifMessage: (data, error) => {
              if (data) {
                return "GET CREATED OK";
              } else {
                return "GET CREATED ERROR error";
              }
            },
            onFailled: (error) => {
              console.log("une erreur", error);
            },
            onSuccess: (data) => {
              console.log("SUCESS");
            },
          }
        )
      );
    },
    getPublications: () => {
      return dispatch(getNancyBookPublications());
    },

    login: () => dispatch(login("htamghuo", "Programmation12")),

    testPostTodo: () =>
      dispatch(
        addTodos(
          { title: "un todo" },
          {
            notifMessage: (data, error) => "Ajout reussit",
          }
        )
      ),
  };
};

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(AppC);

export default RootContainer;

import Banner from "./Banner";
// import MainView from "./MainView";
import React from "react";
// import Tags from "./Tags";
import agent from "../../agent";
import { connect } from "react-redux";
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER,
  EXECUTE_ITEMS_SEARCH,
  CHANGE_QUERY,
} from "../../constants/actionTypes";
import ItemList from "../ItemList";

const Promise = global.Promise;

const mapStateToProps = (state) => ({
  ...state.home,
  ...state.itemList,
  query: state.home.query,
  appName: state.common.appName,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED }),
  executeQuery: (title, pager, payload) =>
    dispatch({ type: EXECUTE_ITEMS_SEARCH, title, pager, payload }),
  onChangeQuery: (query) => dispatch({ type: CHANGE_QUERY, query }),
});

class Home extends React.Component {
  componentWillMount() {
    const tab = "all";
    const itemsPromise = agent.Items.byTitle;

    this.props.onLoad(
      tab,
      itemsPromise,
      Promise.all([agent.Tags.getAll(), itemsPromise()])
    );
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  // componentDidUpdate(props, state) {
  //   if (this.state.query.length > 2) {
  //     this.props.executeQuery(
  //       "all",
  //       (page) => agent.Items.byTitle,
  //       agent.Items.byTitle(this.state.query)
  //     );
  //   }
  // }

  handleChange(e) {
    this.setState({ query: e.target.value });

    if (this.state.query.length >= 2) {
      this.props.executeQuery(
        "all",
        (page) => agent.Items.byTitle,
        agent.Items.byTitle(this.state.query)
      );
    }
  }

  render() {
    return (
      <div className="home-page">
        <Banner query={this.props.query} handleChange={this.handleChange} />
        {this.props.items && this.props.items.length < 1 && (
          <h1 id="empty">No results matching your search</h1>
        )}
        <ItemList
          pager={this.props.pager}
          items={this.props.items}
          loading={this.props.loading}
          itemsCount={this.props.itemsCount}
          currentPage={this.props.currentPage}
        />
        {/* <div className="container page">
          <Tags tags={this.props.tags} onClickTag={this.props.onClickTag} />
          <MainView /> */}
        {/* </div> */}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

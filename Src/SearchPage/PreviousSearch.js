import React from 'react';
import {FlatList, View} from 'react-native';
import Publication from '../Publication/Publication';

export default class PreviousSearch extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(<View>
           {/* <FlatList
                renderItem={
                    ({item}) => (
                        <Publication
                            item={item}
                            data={this.state.data}
                            seePublication={this._seePublication}
                            addCommentaire={this._addCommentaire}
                            seeImage={this.seeImage}
                            seeVideo={this.seeVideo}
                            seeAudio={this.seeAudio}
                            first={true}
                        />
                    )
                }
            />*/}
        </View>)
    }

}

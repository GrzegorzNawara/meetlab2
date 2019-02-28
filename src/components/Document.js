import React from 'react'
import marked from 'marked';
//import debug from './include/debug'

class Document extends React.Component {
  constructor({match}) {
    super();
    this.state = {
      document_id: match.params.document_id,
      content: '' };
    marked.setOptions({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false
    });
  }

  componentDidMount() {
    this.loadDocument(this.state.document_id).then(result => this.setState({
      content: result
    }))
  }

  loadDocument = (document) => {
      return fetch('./documents/'+document+'.txt')
        .then(response => Promise.resolve(response))
        .then(response => response.text());
  }


  render = () => (
    <div>
      <div className={'container border-right border-left box-shadow mt-4'}>
          <button onClick={() => window.history.back()} type="button" className="color-gray close document-close-btn">&times;</button>
        <div dangerouslySetInnerHTML={{__html: this.state.content}} />
      </div>
    </div> )
}

export default Document

import * as React from "react";
import { connect } from "react-redux";
import * as marked from "marked";
import { translateMarkdown, resetState, resizeEditor, resizePreview } from "./aMarkdownPreviewer";
import "./cMarkdownPreviewer.scss";



interface StateProps{
    bareText: string,
    editorMaximized: boolean,
    previewMaximized: boolean,
}

const mapStateToProps = (state: any): StateProps =>{
    return {
        bareText: state.Markdown.bareText,
        editorMaximized: state.Zoom.editorMaximized,
        previewMaximized: state.Zoom.previewMaximized,
    }
}

interface DispatchProps{
    onEditorChange: typeof translateMarkdown,
    resetState: typeof resetState,
    resizeEditor: typeof resizeEditor,
    resizePreview: typeof resizePreview,
}

const mapDispatchToProps = (dispatch: any): DispatchProps =>{
    return {
        onEditorChange: (event: any) => dispatch(translateMarkdown(event)),
        resetState: ()=> dispatch(resetState()),
        resizeEditor: ()=> dispatch(resizeEditor()),
        resizePreview: ()=> dispatch(resizePreview()),
    }
}

interface Props extends StateProps, DispatchProps{

}

class MarkdownPreviewer extends React.Component<Props>{
    constructor(props: Props){
        super(props);
    }

    render(){
        const rows:number = 5;
        const { bareText, onEditorChange, editorMaximized, previewMaximized, resizeEditor, resizePreview } = this.props;
        const classes: any[] = editorMaximized ? 
                                ["editorWrap maximized",
                                "previewWrap hide",
                                "fa fa-compress ml-auto"]
                                : previewMaximized?
                                    ["editorWrap hide",
                                    "previewWrap maximized",
                                    "fa fa-compress ml-auto"]
                                : ["editorWrap",
                                    "previewWrap",
                                    "fa fa-arrows-alt ml-auto"]
        
        const createMarkup = (): {__html: string} =>{
            console.log(bareText);
            return { __html: marked(bareText) }
        }
            
        return(
            <div className="container">
                <div className={classes[0]}>  
                    <div className="container">
                        <div className="row text-left" id="toolbar">
                            <h5>Editor</h5>
                            <i className={classes[2]} onClick={resizeEditor}></i>
                        </div>
                    </div>
                    <textarea id="editor" className="textarea" rows={rows} onChange={onEditorChange} value={bareText}></textarea>
                </div> 
                <div className={classes[1]}>
                    <div className="container">
                        <div className="row text-left" id="toolbar">
                            <h5>Preview</h5>
                            <i className={classes[2]} onClick={resizePreview}></i>
                        </div>
                    </div>
                    <div id="preview" className="textarea" dangerouslySetInnerHTML={createMarkup()}></div>
                </div>
            </div>
        )
    }

    componentDidMount(){
        this.props.resetState();
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(MarkdownPreviewer);
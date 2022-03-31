import React from 'react'

export function NewMessage(props: any) {
    return (
        <div className="form-group mt-3 mb-0">
            <textarea className="form-control" rows={3}
                      placeholder="Type your message here..."/>
            <button type="button" className="btn btn-info">
                Send Message <i className="fa fa-send"/>
            </button>
        </div>
    )
}

export default NewMessage;
'use babel';
import { CompositeDisposable } from 'atom';

function get_regex(grammar) {
  switch(grammar) {
    case 'source.python':
      return /""".*?"""|'''.*?'''|#.*/gm;
    case 'source.cpp':
    case 'source.java':
    case 'source.js':
    case 'source.ts':
      return /\/\*[\s\S]*?\*\/|\/\/.*/gm;
    case 'source.shell':
    case 'source.cmake':
      return /#.*$/gm;
    default:
      return;
  }
}

function rstrip(text) {
  let lines = text.split('\n');
  for(let i = 0; i < lines.length; i++)
    if(lines[i].trim().length > 0) lines[i] = lines[i].trimRight();
  return lines.join('\n');
}

export default {

  subscriptions: null,
  originalText: null,
  notification: null,
  listener: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'hide-comments:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  restore_comments() {
    const ret = this.originalText;
    this.originalText = null;
    return ret;
  },

  hide_comments(text, grammar, removeEmptyLines) {
    this.originalText = text;
    if(removeEmptyLines){
      const lines1 = text.split("\n");
      const lines2 = text.replace(get_regex(grammar), '').split("\n");
      return rstrip(lines2.filter((line, index) => {
        if (line.trim() === "" && lines1[index].trim() !== "") return false;
        else return true;
      }).join("\n"));
    }
    else return rstrip(text.replace(get_regex(grammar), ''));
  },

  toggle() {
    const editor = atom.workspace.getActiveTextEditor();
    if (!editor) return;

    if(this.originalText){
      editor.setReadOnly(false);
      editor.setText(this.restore_comments());
      this.listener.dispose();
      this.notification.dismiss();
    }
    else{
      editor.setText(this.hide_comments(editor.getText(), editor.getGrammar().scopeName, atom.config.get("hide-comments.remove_empty_lines")));
      editor.setReadOnly(true);
      this.notification = atom.notifications.addInfo('<b>Hide Comments</b>: Showing code without comments.<br>⚠️ Text is not editable now.', {dismissable: true});
      this.listener = this.notification.onDidDismiss(() => { this.toggle(); });
    }
  },

};

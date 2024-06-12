export interface NoticeInterface {
  identifier: string;
  title: string;
  contents: string;
  created_date: string;
  modified_date: string;
  status: number;
  kind: number;
  media: string;
  popup_active: boolean;
  popup_media: string;
  priority: number;
  exposure: number;
  banner_media: string;
}

export interface NoticeDisplayable {
  title: string;
  contents: string;
  script: string;
  scriptSrcList: string[];
}

export class Notice {
  title: string;
  contents: string;
  script: string;
  scriptSrcList: string[];

  constructor(notice: NoticeInterface) {
    this.title = notice.title;
    [this.contents, this.script, this.scriptSrcList] = this.extractScript(notice.contents);
  }

  getDisplayable(): NoticeDisplayable {
    return {
      title: this.title,
      contents: this.contents,
      script: this.script,
      scriptSrcList: this.scriptSrcList,
    };
  }

  extractSrcFromScriptString(scriptString: string): string | null {
    const srcRegex = /<script[^>]*src=['"](https:\/\/[^'"]+)['"][^>]*>/;
    const match = scriptString.match(srcRegex);

    if (match) {
      return match[1];
    } else {
      return null;
    }
  }

  extractScript(contents: string): [string, string, string[]] {
    const re = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;

    const matchScripts = contents.match(re);
    const scriptSrcListData: string[] = [];

    let html = contents;
    matchScripts!.forEach((match) => {
      html = html.replace(match, '');
    });

    const scriptStartTagRegExp = /<script\b[^>]*>/g;

    const scripts = matchScripts!.map((match) => {
      let matchScript = match;
      const srcScript = this.extractSrcFromScriptString(match);
      if (srcScript) {
        scriptSrcListData.push(srcScript);
      }

      matchScript = matchScript.replace(scriptStartTagRegExp, '');
      matchScript = matchScript.replace('</script>', '');

      return matchScript;
    });

    const script = scripts.join('\n');

    return [html, script, scriptSrcListData];
  }
}

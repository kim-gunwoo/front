type MessageType = "PUSH" | "MMS" | "EMAIL";

interface IBaseMessage {
  title: string;
  content: string;
}

type MessageExtras = {
  PUSH: { pushToken: string };
  MMS: { phoneNumber: string; mediaUrl: string };
  EMAIL: { emailAddress: string };
};

export class BaseMessage<T extends MessageType> {
  title: string;
  content: string;
  type: T;
  extra: MessageExtras[T];

  constructor(
    type: T,
    extra: MessageExtras[T],
    base: IBaseMessage = { title: "", content: "" }
  ) {
    this.title = base.title;
    this.content = base.content;
    this.type = type;
    this.extra = extra;
  }
}

// 🎯 개별 메시지 클래스 정의
export class PushMessage extends BaseMessage<"PUSH"> {
  constructor(extra: MessageExtras["PUSH"], base?: IBaseMessage) {
    super("PUSH", extra, base);
  }
}

export class MMSMessage extends BaseMessage<"MMS"> {
  constructor(extra: MessageExtras["MMS"], base?: IBaseMessage) {
    super("MMS", extra, base);
  }
}

const push = new PushMessage(
  { pushToken: "123" },
  { title: "1232", content: "adfaf" }
);

const mms = new MMSMessage(
  { phoneNumber: "", mediaUrl: "" },
  { title: "1232", content: "adfaf" }
);

push.extra.pushToken;

mms.extra.mediaUrl;

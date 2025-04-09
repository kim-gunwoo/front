type MessageType = "PUSH" | "MMS" | "EMAIL";

interface IBaseMessage {
  title: string;
  content: string;
}

interface IPushMessage extends IBaseMessage {
  type: Extract<MessageType, "PUSH">;
  pushToken: string;
}

interface IMMSMessage extends IBaseMessage {
  type: Extract<MessageType, "MMS">;
  phoneNumber: string;
  mediaUrl: string;
}

interface IEmailMessage extends IBaseMessage {
  type: Extract<MessageType, "EMAIL">;
  emailAddress: string;
}

export class BaseMessage {
  title: string;
  content: string;

  constructor({ title = "", content = "" }: IBaseMessage) {
    this.title = title;
    this.content = content;
  }

  update<T extends this>(fields: Partial<T>): T {
    return Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this,
      fields
    );
  }
}

// 🎯 개별 메시지 클래스 정의
export class PushMessage extends BaseMessage {
  type: MessageType = "PUSH";
  pushToken: string;

  constructor({
    title = "",
    content = "",
    pushToken = "",
  }: Omit<IPushMessage, "type">) {
    super({ title, content });
    this.pushToken = pushToken;
  }
}

export class MMSMessage extends BaseMessage {
  type: MessageType = "MMS";
  phoneNumber: string;
  mediaUrl: string;

  constructor({
    title = "",
    content = "",
    phoneNumber = "",
    mediaUrl = "",
  }: Omit<IMMSMessage, "type">) {
    super({ title, content });
    this.phoneNumber = phoneNumber;
    this.mediaUrl = mediaUrl;
  }
}

export class EmailMessage extends BaseMessage {
  type: MessageType = "EMAIL";
  emailAddress: string;

  constructor({
    title = "",
    content = "",
    emailAddress = "",
  }: Omit<IEmailMessage, "type">) {
    super({ title, content });
    this.emailAddress = emailAddress;
  }
}

// 🎯 객체 생성 예제
const push = new PushMessage({
  title: "Push Notification",
  content: "New push message received",
  pushToken: "push_token_123",
});

const mms = new MMSMessage({
  title: "MMS Title",
  content: "MMS content",
  phoneNumber: "010-1234-5678",
  mediaUrl: "https://example.com/media.jpg",
});

const email = new EmailMessage({
  title: "Email Subject",
  content: "Email body content",
  emailAddress: "user@example.com",
});

type MessageInstanceMap = {
  PUSH: PushMessage;
  MMS: MMSMessage;
  EMAIL: EmailMessage;
};

type MessageConstructorMap = {
  PUSH: typeof PushMessage;
  MMS: typeof MMSMessage;
  EMAIL: typeof EmailMessage;
};

const messageMap: MessageConstructorMap = {
  PUSH: PushMessage,
  MMS: MMSMessage,
  EMAIL: EmailMessage,
};

export class MessageFactory {
  static create<T extends MessageType>(
    type: T,
    initialData?: Omit<
      ConstructorParameters<MessageConstructorMap[T]>[0],
      "type"
    >
  ): MessageInstanceMap[T] {
    const MessageClass = messageMap[type];
    return new MessageClass({ ...initialData } as any) as MessageInstanceMap[T];
  }
}

const emailFactory = MessageFactory.create("EMAIL");
const mmsFactory = MessageFactory.create("MMS");

console.log(emailFactory);

emailFactory.emailAddress;
mmsFactory.mediaUrl;

emailFactory.update({ content: "123" });

console.log(emailFactory);
console.log(emailFactory.content);

// 🎯 메시지 타입 정의
type MessageType = "PUSH" | "MMS" | "EMAIL";

// 🎯 기본 메시지 클래스 (공통 필드 포함)
class BaseMessage {
  title: string;
  content: string;

  constructor(title = "", content = "") {
    this.title = title;
    this.content = content;
  }

  // ✅ 기존 객체를 복사하여 특정 필드만 변경하는 메서드
  update<T extends this>(fields: Partial<T>): T {
    return Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this,
      fields
    );
  }
}

// 🎯 개별 메시지 클래스 정의
class PushMessage extends BaseMessage {
  type: MessageType = "PUSH";
  pushToken: string;

  constructor(title = "", content = "", pushToken = "") {
    super(title, content);
    this.pushToken = pushToken;
  }
}

class MMSMessage extends BaseMessage {
  type: MessageType = "MMS";
  phoneNumber: string;
  mediaUrl: string;

  constructor(title = "", content = "", phoneNumber = "", mediaUrl = "") {
    super(title, content);
    this.phoneNumber = phoneNumber;
    this.mediaUrl = mediaUrl;
  }
}

class EmailMessage extends BaseMessage {
  type: MessageType = "EMAIL";
  emailAddress: string;

  constructor(title = "", content = "", emailAddress = "") {
    super(title, content);
    this.emailAddress = emailAddress;
  }
}

// 🎯 모든 메시지 타입을 포함하는 `Message` 타입 정의
type Message = PushMessage | MMSMessage | EmailMessage;

// 🎯 팩토리 클래스: Message 객체를 생성
class MessageFactory {
  static create<T extends Message>(
    type: MessageType,
    initialData: Partial<T> = {}
  ): T {
    switch (type) {
      case "PUSH":
        return new PushMessage(
          initialData.title || "",
          initialData.content || "",
          (initialData as Partial<PushMessage>).pushToken || ""
        ) as T;

      case "MMS":
        return new MMSMessage(
          initialData.title || "",
          initialData.content || "",
          (initialData as Partial<MMSMessage>).phoneNumber || "",
          (initialData as Partial<MMSMessage>).mediaUrl || ""
        ) as T;

      case "EMAIL":
        return new EmailMessage(
          initialData.title || "",
          initialData.content || "",
          (initialData as Partial<EmailMessage>).emailAddress || ""
        ) as T;

      default:
        throw new Error("Invalid message type");
    }
  }
}

import React, { useState } from "react";

const MessageForm = () => {
  // ✅ `type`과 `state`를 하나로 통합 (초기 상태: PUSH 메시지)
  const [state, setState] = useState<Message>(MessageFactory.create("PUSH"));

  // ✅ 메시지 타입 변경 시 팩토리 패턴으로 객체 생성
  const handleTypeChange = (newType: MessageType) => {
    setState(MessageFactory.create(newType)); // 새로운 Message 객체 생성
  };

  return (
    <div>
      <h1>Message Form</h1>
      <select
        value={state.type}
        onChange={(e) => handleTypeChange(e.target.value as MessageType)}
      >
        <option value="PUSH">Push</option>
        <option value="MMS">MMS</option>
        <option value="EMAIL">Email</option>
      </select>

      {/* ✅ UI 렌더링 */}
      <MessageFormFactory state={state} setState={setState} />

      <button onClick={() => console.log(state)}>Submit</button>
    </div>
  );
};
const PushMessageForm: React.FC<{
  state: PushMessage;
  setState: React.Dispatch<React.SetStateAction<Message>>;
}> = ({ state, setState }) => (
  <div>
    <label>
      Title:{" "}
      <input
        type="text"
        value={state.title}
        onChange={(e) => setState(state.update({ title: e.target.value }))}
      />
    </label>
    <label>
      Content:{" "}
      <textarea
        value={state.content}
        onChange={(e) => setState(state.update({ content: e.target.value }))}
      />
    </label>
    <label>
      Push Token:{" "}
      <input
        type="text"
        value={state.pushToken}
        onChange={(e) => setState(state.update({ pushToken: e.target.value }))}
      />
    </label>
  </div>
);

const MessageFormFactory = ({
  state,
  setState,
}: {
  state: Message;
  setState: React.Dispatch<React.SetStateAction<Message>>;
}) => {
  if (state instanceof PushMessage) {
    return <PushMessageForm state={state} setState={setState} />;
  } else if (state instanceof MMSMessage) {
    return <MMSMessageForm state={state} setState={setState} />;
  } else if (state instanceof EmailMessage) {
    return <EmailMessageForm state={state} setState={setState} />;
  } else {
    return null;
  }
};

const MMSMessageForm: React.FC<{
  state: MMSMessage;
  setState: React.Dispatch<React.SetStateAction<Message>>;
}> = ({ state, setState }) => (
  <div>
    <label>
      Title:{" "}
      <input
        type="text"
        value={state.title}
        onChange={(e) => setState(state.update({ title: e.target.value }))}
      />
    </label>
    <label>
      Content:{" "}
      <textarea
        value={state.content}
        onChange={(e) => setState(state.update({ content: e.target.value }))}
      />
    </label>
    <label>
      Phone Number:{" "}
      <input
        type="text"
        value={state.phoneNumber}
        onChange={(e) =>
          setState(state.update({ phoneNumber: e.target.value }))
        }
      />
    </label>
    <label>
      Media URL:{" "}
      <input
        type="text"
        value={state.mediaUrl}
        onChange={(e) => setState(state.update({ mediaUrl: e.target.value }))}
      />
    </label>
  </div>
);

const EmailMessageForm: React.FC<{
  state: EmailMessage;
  setState: React.Dispatch<React.SetStateAction<Message>>;
}> = ({ state, setState }) => (
  <div>
    <label>
      Title:{" "}
      <input
        type="text"
        value={state.title}
        onChange={(e) => setState(state.update({ title: e.target.value }))}
      />
    </label>
    <label>
      Content:{" "}
      <textarea
        value={state.content}
        onChange={(e) => setState(state.update({ content: e.target.value }))}
      />
    </label>
    <label>
      Email Address:{" "}
      <input
        type="email"
        value={state.emailAddress}
        onChange={(e) =>
          setState(state.update({ emailAddress: e.target.value }))
        }
      />
    </label>
  </div>
);

// 🎯 기본 메시지 클래스 (공통 필드 포함)
export class BaseMessage {
  title: string;
  content: string;

  constructor(title = "", content = "") {
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

  constructor(title = "", content = "", pushToken = "") {
    super(title, content);
    this.pushToken = pushToken;
  }
}

export class MMSMessage extends BaseMessage {
  type: MessageType = "MMS";
  phoneNumber: string;
  mediaUrl: string;

  constructor(title = "", content = "", phoneNumber = "", mediaUrl = "") {
    super(title, content);
    this.phoneNumber = phoneNumber;
    this.mediaUrl = mediaUrl;
  }
}

export class EmailMessage extends BaseMessage {
  type: MessageType = "EMAIL";
  emailAddress: string;

  constructor(title = "", content = "", emailAddress = "") {
    super(title, content);
    this.emailAddress = emailAddress;
  }
}

// 🎯 모든 메시지 타입을 포함하는 `Message` 타입 정의
export type Message = PushMessage | MMSMessage | EmailMessage;

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

import { z } from "zod";

// 🎯 공통 필드
const baseMessageSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(5, "Content must be at least 5 characters"),
});

// 🎯 개별 메시지 타입별 검증 추가
const pushMessageSchema = baseMessageSchema.extend({
  type: z.literal("PUSH"),
  pushToken: z.string().min(10, "Push Token must be at least 10 characters"),
});

const mmsMessageSchema = baseMessageSchema.extend({
  type: z.literal("MMS"),
  phoneNumber: z
    .string()
    .regex(/^\d{10,11}$/, "Phone number must be 10-11 digits"),
  mediaUrl: z.string().url("Must be a valid URL"),
});

const emailMessageSchema = baseMessageSchema.extend({
  type: z.literal("EMAIL"),
  emailAddress: z.string().email("Invalid email format"),
});

// 🎯 메시지 타입별 스키마를 동적으로 적용 (discriminatedUnion)
export const messageSchema = z.discriminatedUnion("type", [
  pushMessageSchema,
  mmsMessageSchema,
  emailMessageSchema,
]);

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSchema } from "../schemas/messageSchema";
import MessageFormFactory from "./MessageFormFactory";
import { useMessageService } from "../hooks/useMessageService";
import { Message, MessageFactory, MessageType } from "../services/message";

const MessageSender2 = () => {
  // ✅ `message` 상태만 관리 (팩토리 패턴 적용)
  const [message, setMessage] = useState<Message>(
    MessageFactory.create("PUSH")
  );

  // ✅ `message.type`을 활용하여 동적으로 서비스 주입
  const messageService = useMessageService(message.type.toLowerCase());

  const handleSendMessage = () => {
    messageService.sendMessage(message);
  };

  const handleTypeChange = (newType: MessageType) => {
    setMessage(MessageFactory.create(newType)); // 새로운 메시지 객체 생성
  };

  return (
    <div>
      <h2>Send a Message</h2>
      <select
        value={message.type}
        onChange={(e) => handleTypeChange(e.target.value as MessageType)}
      >
        <option value="PUSH">Push Notification</option>
        <option value="MMS">MMS</option>
        <option value="EMAIL">Email</option>
      </select>

      <MessageForm state={message} setState={setMessage} />

      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

const MessageSender = () => {
  // ✅ React Hook Form 설정 (스키마 적용)
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch,
  } = useForm<Message>({
    resolver: zodResolver(messageSchema),
    defaultValues: MessageFactory.create("PUSH"),
  });

  // ✅ 현재 선택된 메시지 타입 감지
  const selectedType = watch("type");

  // ✅ `message.type`을 활용하여 동적으로 서비스 주입
  const messageService = useMessageService(selectedType.toLowerCase());

  // ✅ 메시지 타입 변경 시 새로운 `defaultValues` 적용
  const handleTypeChange = (newType: MessageType) => {
    const newMessage = MessageFactory.create(newType);
    reset(newMessage); // 새로운 타입에 맞는 기본값으로 폼 리셋
  };

  // ✅ 폼 제출 핸들러
  const onSubmit = (data: Message) => {
    messageService.sendMessage(data); // 메시지 전송
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Send a Message</h2>
      <select
        value={selectedType}
        onChange={(e) => handleTypeChange(e.target.value as MessageType)}
      >
        <option value="PUSH">Push Notification</option>
        <option value="MMS">MMS</option>
        <option value="EMAIL">Email</option>
      </select>

      {/* 🎯 폼 필드를 MessageFormFactory에 전달 */}
      <MessageFormFactory register={register} errors={errors} />

      <button type="submit">Send</button>
    </form>
  );
};

const MessageFormFactory = ({
  register,
  errors,
}: {
  register: any;
  errors: any;
}) => {
  const messageType = register("type").value as MessageType;

  switch (messageType) {
    case "PUSH":
      return <PushMessageForm register={register} errors={errors} />;
    case "MMS":
      return <MMSMessageForm register={register} errors={errors} />;
    case "EMAIL":
      return <EmailMessageForm register={register} errors={errors} />;
    default:
      return null;
  }
};

const PushMessageForm: React.FC<{ register: any; errors: any }> = ({
  register,
  errors,
}) => (
  <div>
    <label>
      Title: <input {...register("title")} />
      {errors.title && <p>{errors.title.message}</p>}
    </label>
    <label>
      Content: <textarea {...register("content")} />
      {errors.content && <p>{errors.content.message}</p>}
    </label>
    <label>
      Push Token: <input {...register("pushToken")} />
      {errors.pushToken && <p>{errors.pushToken.message}</p>}
    </label>
  </div>
);

const MMSMessageForm: React.FC<{ register: any; errors: any }> = ({
  register,
  errors,
}) => (
  <div>
    <label>
      Title: <input {...register("title")} />
      {errors.title && <p>{errors.title.message}</p>}
    </label>
    <label>
      Content: <textarea {...register("content")} />
      {errors.content && <p>{errors.content.message}</p>}
    </label>
    <label>
      Phone Number: <input {...register("phoneNumber")} />
      {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
    </label>
    <label>
      Media URL: <input {...register("mediaUrl")} />
      {errors.mediaUrl && <p>{errors.mediaUrl.message}</p>}
    </label>
  </div>
);

const EmailMessageForm: React.FC<{ register: any; errors: any }> = ({
  register,
  errors,
}) => (
  <div>
    <label>
      Title: <input {...register("title")} />
      {errors.title && <p>{errors.title.message}</p>}
    </label>
    <label>
      Content: <textarea {...register("content")} />
      {errors.content && <p>{errors.content.message}</p>}
    </label>
    <label>
      Email Address: <input {...register("emailAddress")} />
      {errors.emailAddress && <p>{errors.emailAddress.message}</p>}
    </label>
  </div>
);

// 🎯 메시지 타입 정의
export type MessageType = "PUSH" | "MMS" | "EMAIL";

// 🎯 메시지 서비스 인터페이스 (DIP 적용)
export interface MessageService {
  sendMessage(message: Message): void;
}

// 🎯 구체적인 메시지 서비스 구현
export class EmailService implements MessageService {
  sendMessage(message: Message) {
    console.log(`📧 Email sent: ${message.title} - ${message.content}`);
  }
}

export class PushNotificationService implements MessageService {
  sendMessage(message: Message) {
    console.log(
      `📱 Push Notification sent: ${message.title} - ${message.content}`
    );
  }
}

export class SMSService implements MessageService {
  sendMessage(message: Message) {
    console.log(`📩 SMS sent: ${message.title} - ${message.content}`);
  }
}

// 🎯 팩토리 패턴을 활용한 MessageService 인스턴스 생성
class MessageServiceFactory {
  static create(serviceType: string): MessageService {
    switch (serviceType) {
      case "email":
        return new EmailService();
      case "push":
        return new PushNotificationService();
      case "sms":
        return new SMSService();
      default:
        throw new Error(`Unknown service type: ${serviceType}`);
    }
  }
}

// 🎯 DI 컨테이너: 서비스 인스턴스를 중앙에서 관리
class ServiceContainer {
  private static instances = new Map<string, MessageService>();

  static getService(type: string): MessageService {
    if (!this.instances.has(type)) {
      this.instances.set(type, MessageServiceFactory.create(type)); // 팩토리 패턴 활용
    }
    return this.instances.get(type)!;
  }
}

export class ServiceContainer2 {
  private static instances = new Map<string, MessageService>();

  static getService(type: string): MessageService {
    if (!this.instances.has(type)) {
      const service = this.createService(type);
      this.instances.set(type, service);
    }
    return this.instances.get(type)!;
  }

  private static createService(type: string): MessageService {
    switch (type) {
      case "email":
        return new EmailService();
      case "push":
        return new PushNotificationService();
      case "sms":
        return new SMSService();
      default:
        throw new Error(`Unknown service type: ${type}`);
    }
  }
}

import { useState } from "react";

// 🎯 의존성 주입을 활용한 커스텀 훅
const useMessageService = (serviceType: string) => {
  const [messageService] = useState(() =>
    ServiceContainer.getService(serviceType)
  );

  return messageService;
};

/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { acceptMessage } from '../fn/message/accept-message';
import { AcceptMessage$Params } from '../fn/message/accept-message';
import { createMessage } from '../fn/message/create-message';
import { CreateMessage$Params } from '../fn/message/create-message';
import { getChatMessages } from '../fn/message/get-chat-messages';
import { GetChatMessages$Params } from '../fn/message/get-chat-messages';
import { MessageResponse } from '../models/message-response';
import { uploadMedia } from '../fn/message/upload-media';
import { UploadMedia$Params } from '../fn/message/upload-media';

@Injectable({ providedIn: 'root' })
export class MessageService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createMessage()` */
  static readonly CreateMessagePath = '/api/v1/messages';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createMessage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createMessage$Response(params: CreateMessage$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return createMessage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createMessage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createMessage(params: CreateMessage$Params, context?: HttpContext): Observable<void> {
    return this.createMessage$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `acceptMessage()` */
  static readonly AcceptMessagePath = '/api/v1/messages';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `acceptMessage()` instead.
   *
   * This method doesn't expect any request body.
   */
  acceptMessage$Response(params: AcceptMessage$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return acceptMessage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `acceptMessage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  acceptMessage(params: AcceptMessage$Params, context?: HttpContext): Observable<void> {
    return this.acceptMessage$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `uploadMedia()` */
  static readonly UploadMediaPath = '/api/v1/messages/upload-media';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadMedia()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadMedia$Response(params: UploadMedia$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return uploadMedia(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadMedia$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadMedia(params: UploadMedia$Params, context?: HttpContext): Observable<void> {
    return this.uploadMedia$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getChatMessages()` */
  static readonly GetChatMessagesPath = '/api/v1/messages/chat/{chat-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getChatMessages()` instead.
   *
   * This method doesn't expect any request body.
   */
  getChatMessages$Response(params: GetChatMessages$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<MessageResponse>>> {
    return getChatMessages(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getChatMessages$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getChatMessages(params: GetChatMessages$Params, context?: HttpContext): Observable<Array<MessageResponse>> {
    return this.getChatMessages$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<MessageResponse>>): Array<MessageResponse> => r.body)
    );
  }

}
